import { defineStore } from "pinia";
import axios from 'axios';

export const usePostStore = defineStore({
    id: "post",
    state: () => ({
        posts: [],
        isLoading: false,
        error: false,
        post: null
    }),
    getters: {

    },
    actions: {
        async getPosts() {
            const self = this;
            this.isLoading = true;
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(function (response) {
                    self.posts = response.data;
                    self.isLoading = false;
                })
                .catch(function (error) {
                    self.isLoading = false;
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
    }
});