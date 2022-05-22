<template>
  <v-card class="my-5" flat outlined>
    <nuxt-link :to="'/blog/' + content.id">
      <v-row class="ma-0 pa-5">
        <v-col cols="12" sm="12" md="5" class="ma-0 pa-0">
          <v-img
            :src="content.thumbnail.url || 'day_flower.png'"
            class="thumbnail"
          />
        </v-col>
        <v-col cols="12" sm="12" md="7" class="pa-0 pl-md-10">
          <v-card-title class="blog-title">{{ content.title }}</v-card-title>
          <div class="d-flex">
            <v-card-text class="meta">
              <v-icon :size="$vuetify.breakpoint.smAndUp ? '16' : '14'">
                mdi-clock-outline
              </v-icon>
              {{ new Date(content.createdAt).toLocaleDateString() }}
            </v-card-text>
            <v-card-text class="meta">
              <v-icon :size="$vuetify.breakpoint.smAndUp ? '16' : '14'">
                mdi-account-outline
              </v-icon>
              {{ content.author }}
            </v-card-text>
          </div>
        </v-col>
      </v-row>
    </nuxt-link>
  </v-card>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.thumbnail {
  border-radius: 5px;
}

.blog-title {
  padding: 0;
  margin: 10px 0;
  font-size: 20px;
  font-weight: 700;
  color: #2b2c30;
}

.meta {
  display: inline-flex;
  align-items: center;
  padding: 10px 0 40px;
  font-size: 14px;
  color: #616269;
  white-space: nowrap;
}
@media (min-width: 600px) and (max-width: 960px) {
  .meta {
    font-size: 16px;
  }
}
@media (min-width: 960px) {
}
</style>
