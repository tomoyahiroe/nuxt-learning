<template>
  <div class="frame">
    <BlogListItem
      v-for="content in contents"
      :key="content.title"
      :content="content"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    contents: []
  }),
  created() {
    this.$axios
      .get(this.$config.MICROCMS_API_URL + '/blog', this.header())
      .then((res) => {
        this.contents = res.data.contents
      })
      .catch((e) => {
        console.log('microCMS/listBlogs/Error', e)
      })
  },
  methods: {
    header() {
      return {
        headers: { 'X-MICROCMS-API-KEY': this.$config.MICROCMS_API_KEY }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.frame {
  padding: 0 20px;
  margin: 20px 0 0;
}
@media (min-width: 820px) and (max-width: 1160px) {
  .frame {
    width: 740px;
    margin: 20px auto 0;
  }
}
@media (min-width: 1160px) {
  .frame {
    display: flex;
    justify-content: space-between;
    width: 1104px;
    margin: 20px auto 0;
  }
}
</style>
