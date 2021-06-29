import json, logging
from . import app, client, cache, create_token, create_token_2, init_database


class TestMemberCrud():
    def test_get_user_guild(self, client, init_database):
        token = create_token()

        res = client.get('/members',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_member_detail(self, client, init_database):
        token = create_token()

        res = client.get('/members/1',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_member_detail_invalid(self, client, init_database):
        token = create_token()

        res = client.get('/members/10',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404

    def test_post_member(self, client, init_database):
        token = create_token_2()

        data = {
            'guild_id': 1,
        }

        res = client.post('/members',
                          headers={'Authorization': 'Bearer ' + token},
                          data=json.dumps(data),
                          content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_member(self, client, init_database):
        token = create_token_2()

        res = client.delete('/members/1',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_member_invalid(self, client, init_database):
        token = create_token_2()

        res = client.delete('/members/10',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404
