import { get } from "@/apis/request";

export const getConfig = () => {
  return get(`/site.json`);
};

export const getPosts = (current = 1) => {
  return get(`/posts/${current}.json`);
};

export const getPostBySlug = (slug) => {
  return get(`/articles/${slug}.json`);
};

export const getCategories = () => {
  return get(`/categories.json`);
};

export const getGalleries = () => {
  return get(`/galleries.json`);
};

export const getGalleryByName = (name) => {
  return get(`/galleries/${name}.json`);
};

export const getAllGalleries = () => {
  return get(`/galleries/all.json`);
};
