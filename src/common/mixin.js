





export const messageMixin = {
  methods: {
    //弹出信息
    message(message, type) {
      this.$message({
        message,
        type,
      });
    },
  }
}