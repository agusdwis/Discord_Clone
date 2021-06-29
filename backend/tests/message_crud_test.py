import json, logging
from . import app, client, cache, create_token, create_token_2, init_database


class TestMemberCrud():
    def test_post_message(self, client, init_database):
        token = create_token_2()

        data = {
            'guild_id': 1,
            'content': 'test'
        }

        res = client.post('/messages',
                          headers={'Authorization': 'Bearer ' + token},
                          data=json.dumps(data),
                          content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_message(self, client, init_database):
        token = create_token()

        data = {
            'guild_id': 1,
        }

        res = client.get('/messages',
                         headers={'Authorization': 'Bearer ' + token},
                         query_string=data,
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_message(self, client, init_database):
        token = create_token()

        res = client.delete('/messages/1',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_message_invalid(self, client, init_database):
        token = create_token()

        res = client.delete('/messages/2',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404
