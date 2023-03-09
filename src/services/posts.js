import useApi from 'src/composables/UseAPI'

export default function postsService () {
  const { list, post, update, remove, getById } = useApi('api/users')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
