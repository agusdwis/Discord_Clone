import json, logging
from . import app, client, cache, create_token, init_database


class TestAuthCrud():
    def test_login_user(self, client, init_database):
        data = {
            'username': 'agus3',
            'password': 'password'
        }
        res = client.post('/users/login',
                          data=json.dumps(data),
                          query_string=data,
                          content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404
