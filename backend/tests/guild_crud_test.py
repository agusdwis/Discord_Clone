import json, logging
from . import app, client, cache, create_token, create_token_2, init_database


class TestGuildCrud():
    def test_options(self, client, init_database):
        token = create_token()

        res = client.options('/guilds',
                             headers={'Authorization': 'Bearer ' + token},
                             content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_guild(self, client, init_database):
        token = create_token()

        data = {
            'category': 'music',
            'order_by': 'name'
        }

        res = client.get('/guilds',
                         headers={'Authorization': 'Bearer ' + token},
                         query_string=data,
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_guild_desc(self, client, init_database):
        token = create_token()

        data = {
            'category': 'music',
            'order_by': 'name',
            'sort': 'desc'
        }

        res = client.get('/guilds',
                         headers={'Authorization': 'Bearer ' + token},
                         query_string=data,
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_post_guild(self, client, init_database):
        token = create_token()

        data = {
            'name': 'guild lagi lagi',
            'category': 'music',
            'description': 'name',
            'banner': 'gambar'
        }

        res = client.post('/guilds',
                          headers={'Authorization': 'Bearer ' + token},
                          data=json.dumps(data),
                          content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_detail_guild(self, client, init_database):
        token = create_token()

        res = client.get('/guilds/1',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_detail_guild_invalid(self, client, init_database):
        token = create_token()

        res = client.get('/guilds/10',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404

    def test_put_guild(self, client, init_database):
        token = create_token()

        data = {
            'name': 'guild lagi lagi',
            'category': 'music',
            'description': 'name',
            'banner': 'gambar'
        }

        res = client.put('/guilds/1',
                         headers={'Authorization': 'Bearer ' + token},
                         data=json.dumps(data),
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_put_guild_invalid(self, client, init_database):
        token = create_token()

        data = {
            'name': 'guild lagi lagi',
            'category': 'music',
            'description': 'name',
            'banner': 'gambar'
        }

        res = client.put('/guilds/10',
                         headers={'Authorization': 'Bearer ' + token},
                         data=json.dumps(data),
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404

    def test_delete_guild(self, client, init_database):
        token = create_token()

        res = client.delete('/guilds/1',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_delete_guild_invalid(self, client, init_database):
        token = create_token()

        res = client.delete('/guilds/10',
                            headers={'Authorization': 'Bearer ' + token},
                            content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404

    def test_search_guild(self, client, init_database):
        token = create_token()

        data = {
            'keyword': '',
            'order_by': 'name',
        }

        res = client.get('/guilds/search',
                         headers={'Authorization': 'Bearer ' + token},
                         query_string=data,
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_search_guild_by_category(self, client, init_database):
        token = create_token()

        data = {
            'keyword': '',
            'order_by': 'category',
        }

        res = client.get('/guilds/search',
                         headers={'Authorization': 'Bearer ' + token},
                         query_string=data,
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_options_method(self, client, init_database):
        token = create_token()

        data = {
            'keyword': '',
            'order_by': 'category',
        }

        res = client.options('/guilds/search',
                             headers={'Authorization': 'Bearer ' + token},
                             query_string=data,
                             content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_guild_member(self, client, init_database):
        token = create_token()

        res = client.get('/guilds/members/1',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_guild_member_2(self, client, init_database):
        token = create_token_2()

        res = client.get('/guilds/members/2',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 200

    def test_get_guild_member_invalid_guild(self, client, init_database):
        token = create_token()

        res = client.get('/guilds/members/10',
                         headers={'Authorization': 'Bearer ' + token},
                         content_type='application/json')

        res_json = json.loads(res.data)
        assert res.status_code == 404
