import pytest
import json
import logging
import hashlib, uuid

from blueprints import app
from flask import Flask, request
from app import cache, logging
from blueprints import db

from blueprints.users.model import Users
from blueprints.guilds.model import Guilds
from blueprints.members.model import Members
from blueprints.messages.model import Messages


def call_client(request):
    client = app.test_client()
    return client


@pytest.fixture
def client(request):
    return call_client(request)


@pytest.fixture
def init_database():
    # create the database and the database table
    db.create_all()

    salt = uuid.uuid4().hex
    encoded = ('%s%s' % ("password", salt)).encode('utf-8')
    hash_pass = hashlib.sha512(encoded).hexdigest()

    user01 = Users(username='agus', email='agus@discord.gg', salt=salt, password=hash_pass)
    user02 = Users(username='suga', email='suga@discord.gg', salt=salt, password=hash_pass)

    db.session.add(user01)
    db.session.add(user02)
    db.session.commit()

    guild01 = Guilds(name='guild1', description='ok', category='music', banner='aaa', owner_id=1)
    guild02 = Guilds(name='guild2', description='ok', category='sport', banner='bbb', owner_id=2)

    db.session.add(guild01)
    db.session.add(guild02)
    db.session.commit()

    member01 = Members(guild_id=1, user_id=1)
    member02 = Members(guild_id=2, user_id=1)
    member03 = Members(guild_id=2, user_id=2)

    db.session.add(member01)
    db.session.add(member02)
    db.session.add(member03)
    db.session.commit()

    message = Messages(guild_id=1, user_id=1, content='heyo')
    db.session.add(message)
    db.session.commit()

    yield db

    db.drop_all()


def create_token():
    token = cache.get('test-token')
    if token is None:
        # prepare request input
        data = {
            'username': 'agus',
            'password': 'password',
        }

        # do request
        req = call_client(request)
        res = req.post('/users/login', query_string=data, content_type='application/json')

        # store response
        res_json = json.loads(res.data)

        app.logger.warning('RESULT : %s', res_json)

        # assert / compare with expected result
        assert res.status_code == 200

        # save token into cache
        cache.set('test-token', res_json['token'], timeout=60)

        # return, because it usefull for other test
        return res_json['token']
    else:
        return token


def create_token_2():
    token = cache.get('test-token')
    if token is None:
        # prepare request input
        data = {
            'username': 'suga',
            'password': 'password',
        }

        # do request
        req = call_client(request)
        res = req.post('/users/login', query_string=data, content_type='application/json')

        # store response
        res_json = json.loads(res.data)

        app.logger.warning('RESULT : %s', res_json)

        # assert / compare with expected result
        assert res.status_code == 200

        # save token into cache
        cache.set('test-token', res_json['token'], timeout=60)

        # return, because it usefull for other test
        return res_json['token']
    else:
        return token
