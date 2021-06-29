from flask import Blueprint
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    get_jwt_claims,
)
from flask_restful import Resource, Api, reqparse, marshal, inputs
from blueprints import db, app, user_required
from sqlalchemy import desc
from .model import Guilds
from blueprints.members.model import Members
from blueprints.users.model import Users
import hashlib
import json
import uuid

bp_guild = Blueprint("guild", __name__)
api = Api(bp_guild)


class GuildsResources(Resource):
    def options(self):
        return {"status": "ok"}, 200

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("category", location="args")
        parser.add_argument("p", type=int, location="args", default=1)
        parser.add_argument(
            "rp", type=int, location="args", default=200
        )
        parser.add_argument(
            "order_by",
            location="args",
            help="invalid order_by value",
            choices=["name"],
        )
        parser.add_argument(
            "sort",
            location="args",
            help="invalid sort value",
            choices=("desc", "asc"),
        )

        args = parser.parse_args()
        offset = (args["p"] * args["rp"]) - args["rp"]

        qry = Guilds.query
        qry = qry.filter_by(status=True)

        if args["category"] is not None:
            qry = qry.filter_by(category=(args["category"]))

        if args["order_by"] is not None:
            if args["order_by"] == "name":
                if args["sort"] == "desc":
                    qry = qry.order_by(desc(Guilds.name))
                else:
                    qry = qry.order_by(Guilds.name)

        rows = []
        for row in qry.limit(args["rp"]).offset(offset).all():
            rows.append(marshal(row, Guilds.response_fields))

        return rows, 200


class GuildsDetailResources(Resource):
    def options(self):
        return {"status": "ok"}, 200

    @user_required
    def get(self, id=None):
        claims = get_jwt_claims()
        user_id = claims["id"]

        qry = Guilds.query.get(id)
        if qry is not None:

            member = Members.query.filter_by(status=True)
            member = member.filter_by(guild_id=id).all()
            isMember = False

            if member is not None:
                for mem in member:
                    if mem.user_id == user_id:
                        isMember = True

            marshalGuild = marshal(qry, Guilds.response_fields)
            marshalGuild["isMember"] = isMember

            app.logger.debug("DEBUG : %s", qry)
            return marshalGuild, 200

        app.logger.debug("DEBUG : Guild not found!")
        return {"status": "NOT_FOUND"}, 404

    @user_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", location="json", required=True)
        parser.add_argument(
            "description", location="json", required=True
        )
        parser.add_argument("category", location="json", required=True)
        parser.add_argument("banner", location="json", required=True)
        data = parser.parse_args()

        claims = get_jwt_claims()
        user_id = claims["id"]

        guild = Guilds(
            data["name"],
            data["description"],
            data["category"],
            data["banner"],
            user_id,
        )
        db.session.add(guild)
        db.session.commit()

        app.logger.debug("DEBUG : %s", guild)
        return (
            marshal(guild, Guilds.response_fields),
            200,
            {"Content-Type": "application/json"},
        )

    @user_required
    def put(self, id):
        guild = Guilds.query.filter_by(id=id).first()

        if guild is None:
            return {"status": "NOT_FOUND"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument("name", location="json", default=guild.name)
        parser.add_argument(
            "description", location="json", default=guild.description
        )
        parser.add_argument(
            "category", location="json", default=guild.category
        )
        parser.add_argument(
            "banner", location="json", default=guild.banner
        )
        parser.add_argument(
            "status", location="json", default=guild.status
        )
        data = parser.parse_args()

        claims = get_jwt_claims()
        user_id = claims["id"]

        guild.name = data["name"]
        guild.description = data["description"]
        guild.category = data["category"]
        guild.banner = data["banner"]
        guild.owner_id = user_id

        if data["status"]:
            guild.status = data["status"]

        db.session.commit()

        return marshal(guild, Guilds.response_fields), 200

    @user_required
    def delete(self, id):
        qry = Guilds.query.get(id)
        if qry is None:
            return {"status": "NOT_FOUND"}, 404

        qry.status = False
        db.session.commit()

        return {"status": "DELETED"}, 200


class GuildsSearchResources(Resource):
    def options(self):
        return {"status": "ok"}, 200

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("keyword", location="args")
        parser.add_argument("p", type=int, location="args", default=1)
        parser.add_argument("rp", type=int, location="args", default=20)
        parser.add_argument(
            "order_by",
            location="args",
            help="invalid order_by value",
            choices=["name", "category"],
        )

        args = parser.parse_args()
        offset = (args["p"] * args["rp"]) - args["rp"]

        guild = Guilds.query.filter_by(status=True)

        if args["keyword"] is not None:
            guild = Guilds.query.filter(
                Guilds.name.like("%" + args["keyword"] + "%")
                | Guilds.category.like("%" + args["keyword"] + "%")
                | Guilds.description.like("%" + args["keyword"] + "%")
                | Guilds.category.like("%" + args["keyword"] + "%")
            )

        guild = guild.order_by(Guilds.created_at)
        guild = guild.filter_by(status=True)
        if args["order_by"] is not None:
            if args["order_by"] == "name":
                guild = guild.order_by(desc(Guilds.name))

            if args["order_by"] == "category":
                guild = guild.order_by(desc(Guilds.category))

        rows = []
        for row in guild.limit(args["rp"]).offset(offset).all():
            rows.append(marshal(row, Guilds.response_fields))

        return rows, 200


class GuildsMemberResources(Resource):
    def options(self):
        return {"status": "ok"}, 200

    @user_required
    def get(self, id=None):
        qry = Guilds.query.get(id)
        if qry is not None:
            member = Members.query.filter_by(status=True)
            member = member.filter_by(guild_id=id).all()

            listMember = []
            for mem in member:
                user = Users.query.filter_by(id=mem.user_id).first()
                marshalUser = marshal(user, Users.response_fields)

                if qry.owner_id == user.id:
                    marshalUser["isAdmin"] = True
                else:
                    marshalUser["isAdmin"] = False

                if marshalUser not in listMember:
                    listMember.append(marshalUser)

            app.logger.debug("DEBUG : %s", qry)
            return listMember, 200

        app.logger.debug("DEBUG : Guild not found!")
        return {"status": "NOT_FOUND"}, 404


api.add_resource(GuildsResources, "", "/list")
api.add_resource(GuildsDetailResources, "", "/<int:id>")
api.add_resource(GuildsSearchResources, "/search")
api.add_resource(GuildsMemberResources, "/members/<int:id>")
