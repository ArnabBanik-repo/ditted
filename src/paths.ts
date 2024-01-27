const paths = {
  home() {
    return '/';
  },
  topicShow(slug: string) {
    return `/topics/${slug}`;
  },
  postShow(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`
  },
  postCreate(slug: string, postId: string) {
    return `/topics/${slug}/new`
  }
};

export default paths;
