export default {
  methods: {
    toPage(path, query) {
      this.$router.push({
        path,
        query,
      })
    },
  },
}
