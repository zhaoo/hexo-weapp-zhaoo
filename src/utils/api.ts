import { get } from '@/utils/request'

const getConfig = () => {
  return get(`/site.json`)
}

const getPosts = (current = 1) => {
  return get(`/posts/${current}.json`)
}

const getAllPosts = () => {
  return get(`/posts.json`)
}


const getPostBySlug = (slug) => {
  return get(`/articles/${slug}.json`)
}

const getCategories = () => {
  return get(`/categories.json`)
}

const getGalleries = () => {
  return get(`/galleries.json`)
}

const getGalleryByName = (name) => {
  return get(`/galleries/${name}.json`)
}

const getAllGalleries = () => {
  return get(`/galleries/all.json`)
}

export { 
  getConfig, 
  getPosts, 
  getAllPosts,
  getPostBySlug, 
  getCategories, 
  getGalleries,
  getGalleryByName,
  getAllGalleries
}