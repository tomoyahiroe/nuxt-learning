<template>
  <v-app class="bg">
    <v-app-bar
      app
      color="#ffffff"
      light
      flat
      dense
      style="border-bottom: 1px solid rgb(0 0 0 / 12%)"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold text-h5">
        Nuxt学習用サイト
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      light
      :permanent="$vuetify.breakpoint.smAndUp"
      color="#ffffff"
      height="100%"
      width="200px"
      expand-on-hover
    >
      <v-list dense nav rounded>
        <v-list-item
          v-for="item in pages"
          :key="item.title"
          :to="item.path"
          nuxt
          color="#262626"
          :class="$vuetify.breakpoint.xs ? '' : 'mt-3'"
        >
          <v-list-item-icon>
            <v-icon color="#262626">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: #262626" class="font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list dense nav rounded>
          <v-list-item
            v-if="$vuetify.breakpoint.xs"
            color="#262626"
            @click.stop="drawer = false"
          >
            <v-list-item-icon>
              <v-icon color="#262626">mdi-backspace-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>メニューを閉じる</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    pages: [
      {
        title: 'トップ',
        icon: 'mdi-home',
        path: '/'
      },
      {
        title: 'フォーム',
        icon: 'mdi-form-select',
        path: '/forms'
      },
      {
        title: 'ブログ',
        icon: 'mdi-post-outline',
        path: '/blog'
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: #f3f3f4;
}
</style>
