import np from 'number-precision'

export default (context, inject) => {
  //is beyond boundary when transfer to integer, the results may not be accurate
  //默认为true打开 设置为false关闭边界检查
  np.enableBoundaryChecking(false);
  context.$np = np;
  inject("np", np);
}
