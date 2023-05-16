import { useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';


const API_KEY = '34728091-aad7c1a347ba4d65085b0c300';
const BASE_URL = 'https://pixabay.com/api/?';
const searchParams = 'image_type=photo&orientation=horizontal&per_page=12'
const scroll = Scroll.animateScroll;

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (query) => {
    if (query === searchQuery) {
        return
      }
    const searchUrl = `${BASE_URL}q=${query}&page=1&key=${API_KEY}&${searchParams}`;
    try {
      setIsLoading(true);
      scroll.scrollToTop();
      const response = await axios.get(searchUrl);
      if (response.data.hits.length === 0) {
        Notiflix.Notify.info('Images not found. Please change your request')
        return
      }
      setSearchQuery(query);
      setImages([...response.data.hits]);
      setPage(1)

    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = async () => {
    const searchUrl = `${BASE_URL}q=${searchQuery}&page=${page+1}&key=${API_KEY}&${searchParams}`;
    try {
     setIsLoading(true);
      const response = await axios.get(searchUrl);
      scroll.scrollMore(500);
      if (response.data.hits.length === 0) {
        Notiflix.Notify.info('The images of your request is over')
        return
      }

      setImages(prevState => [...prevState, ...response.data.hits]);
      setPage(prevState => prevState+1)

    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
   <>
      <Searchbar onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {images.length !== 0 && <Button handleClick={handleClick} />}
      </>
  )
}
