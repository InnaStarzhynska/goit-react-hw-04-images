import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { useState, useEffect } from 'react'

export function ImageGallery({images}) {
    const [largeImage, setLargeImage] = useState('');
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

  const removeEvtListener = () => {
        window.removeEventListener('keydown', handleKeyDown);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return removeEvtListener;
    }, [])

    const handleKeyDown = (evt) => {
        if (evt.code === 'Escape') {
            setIsOpen(false)
        }
    }

    const handleClickImage = (evt) => {
        const { dataset, alt } = evt.target;
        
        setLargeImage(dataset.image);
        setTitle(alt);
        setIsOpen(true);
    }

    const handleClickBackdrop = (evt) => {
        if (evt.currentTarget === evt.target) {
           setIsOpen(false);
        }
    }

  return (
    <ul className={css.imageGallery}>
                {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                    return <ImageGalleryItem key={id} webFormat={webformatURL} largeFormat={largeImageURL} tags={tags} handleClick={handleClickImage} />
                })}
                {isOpen && <Modal largeImageURL={largeImage} title={title} onClick={handleClickBackdrop} />}
            </ul>
  )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
}