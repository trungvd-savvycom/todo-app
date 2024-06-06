<template>
  <div class="card mb-3">
    <div class="card-body row">
      <img class="col-sm-6" v-if="thumbnail && ((index % 2) === 0)" :src="thumbnail" alt="New image" >
      <div class="col-sm-6">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
      </div>
      <img class="col-sm-6" v-if="thumbnail && ((index % 2) === 1)" :src="thumbnail" alt="New image" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewCard',
  props: {
    title: String,
    description: String,
    thumbnail: String,
    index: Number,
  },
};
</script>

<style scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>