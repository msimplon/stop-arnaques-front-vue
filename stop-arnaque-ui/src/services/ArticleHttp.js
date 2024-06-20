import { http } from "../plugins/axios.js"

export class ArticleHttp {
    async get_all_articles() {
        const url = `/articles/list-articles`;
        const response = await http.get(url);
        return response;
    };

    async add_new_article() {
        const url = `/articles`;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        const response = await http.post(url, config);
        return response;
    };

    async get_last_added_articles() {
        const url = `/articles/articleLastAdded`;
        const response = await http.get(url);
        return response;
    };

    async get_one_article(id) {
        const url = `articles/${id}/detail`;
        const response = await http.get(url);
        return response;

    };
    async update_article() {
        const url = `/ articles/${this.id}`;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        const response = await http.patch(url, config);
        return response;
    };

    async remove_article(id) {
        const url = `/articles/byId/${id}`;
        const response = await http.delete(url);
        return response;
    }
}
