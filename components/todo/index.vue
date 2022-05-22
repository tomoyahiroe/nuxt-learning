<template>
  <v-container fluid>
    <v-row>
      <v-text-field v-model="todo" class="mx-4"></v-text-field>
      <v-btn class="mb-2" color="secondary" elevation="2" @click="createTodo()"
        >追加</v-btn
      >
    </v-row>
    <v-row dence>
      <v-card
        v-for="(item, index) in todos"
        :key="item.id"
        class="mx-2 my-2"
        width="240px"
      >
        <v-card-title>{{ item.todo }}</v-card-title>
        <v-text-field v-model="editItem[index]" class="mx-2"></v-text-field>
        <v-btn
          class="my-1 mx-1 secondary"
          elevation="2"
          @click="updateTodo(item, index)"
        >
          変更
        </v-btn>
        <v-btn
          elevation="2"
          class="my-1 mx-1 secondary"
          @click="deleteTodo(item)"
        >
          Done!
        </v-btn>
      </v-card>
      <v-card
        v-for="(item, index) in $store.getters.todos"
        :key="item"
        class="mx-2 my-2"
        width="240px"
      >
        <v-card-title>{{ item }}</v-card-title>
        <v-text-field v-model="editItem[index]" class="mx-2"></v-text-field>
        <v-btn
          class="my-1 mx-1 secondary"
          elevation="2"
          @click="updateTodo(item, index)"
        >
          変更
        </v-btn>
        <v-btn
          elevation="2"
          class="my-1 mx-1 secondary"
          @click="deleteTodo(item)"
          >Done!</v-btn
        >
      </v-card>
    </v-row>
    {{ todos }}
  </v-container>
</template>
<script>
export default {
  data: () => ({
    todo: '',
    todos: [],
    editItem: [],
    newTodo: '',
    required: (v) => !!v || '必須項目です',
    max30: (v) => (!v ? true : (v && v.length <= 30) || '30文字までです')
  }),
  created() {
    this.readTodo()
  },
  methods: {
    async createTodo() {
      await this.$axios
        .post(
          this.$config.MICROCMS_API_URL + '/todo',
          { todo: this.todo },
          this.header()
        )
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log(e)
        })
      this.$store.commit('addTodo', this.todo)
    },
    async updateTodo(item, i) {
      await this.$axios
        .patch(
          this.$config.MICROCMS_API_URL + '/todo/' + item.id,
          { todo: this.editItem[i] },
          this.header()
        )
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log(e)
        })
      this.$store.commit('updateTodo', {
        oldTodo: item.todo,
        renewTodo: this.editItem[i]
      })

      console.log(item)
      console.log(this.editItem)
    },
    async readTodo() {
      await this.$axios
        .get(this.$config.MICROCMS_API_URL + '/todo', this.header())
        .then((v) => {
          this.todos = v.data.contents
          this.$store.commit(
            'setTodos',
            v.data.contents.map((v) => v.todo)
          )
          console.log(v)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // {id, created, ...}
    async deleteTodo(item) {
      await this.$axios
        .delete(
          this.$config.MICROCMS_API_URL + '/todo/' + item.id,
          this.header()
        )
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log(e)
        })
      this.$store.commit('deleteTodo', item)
    },
    header() {
      return {
        headers: { 'X-MICROCMS-API-KEY': this.$config.MICROCMS_API_KEY }
      }
    }
  }
}
</script>
