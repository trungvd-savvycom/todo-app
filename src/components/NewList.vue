<template>
  <div class="col-md-12">
    <h2 class="mb-3">Company News</h2>
    <div v-for="(item, index) in news" :key="item.title">
      <NewCard 
        :index="index"
        :thumbnail="item.urlToImage"
        :title="item.title" 
        :description="item.description" 
      />
    </div>
  </div>
</template>

<script>
import NewCard from "./NewCard.vue";

export default {
  name: 'NewList',
  components: {
    NewCard,
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        const data = await response.json();
        this.news = data.articles.filter((item) => (item.urlToImage && item.title && item.description));
      } catch (error) { 
        console.error("Error fetching news:", error);
      }
    },
  },
  data() {
    return {
      news: [],
    };
  },
  created() {
    this.fetchNews();
  },
};
</script>

<style scoped>
</style>
