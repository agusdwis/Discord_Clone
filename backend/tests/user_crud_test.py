import json, logging
from . import app, client, cache, create_token, init_database


class TestUserCrud():
    def test_post_user(self, client, init_database):
        data = {
            'username': 'agus2',
            'email': 'agus2@discord.gg',
            'password': 'password'
        }
        res = client.post('/users/register',
                          data=json.dumps(data),
                          content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_user(self, client, init_database):
        token = create_token()
        res = client.get('/users/info',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_user(self, client, init_database):
        token = create_token()
        res = client.delete('/users/info',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200
