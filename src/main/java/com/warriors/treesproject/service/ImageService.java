package com.warriors.treesproject.service;

import com.warriors.treesproject.entity.Image;
import com.warriors.treesproject.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ImageService {

    private ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image getImageById(Long id) {
        Image image = imageRepository.findById(id).get();
        return image;
    }

    public List<Image> getAllImages() {
        List<Image> images = imageRepository.findAll();
        return images;
    }

    @Transactional
    public void save(Image image) {
        imageRepository.save(image);
    }

    @Transactional
    public void update(Long id, Image updatedImage) {
        Image imageToUpdate = getImageById(id);
        imageToUpdate.setImageData(updatedImage.getImageData());
        imageRepository.save(imageToUpdate);
    }

    @Transactional
    public void delete(Long id) {
        Image imageToDelete = getImageById(id);
        imageRepository.delete(imageToDelete);
    }

    @Transactional
    public void delete(Image image) {
        imageRepository.delete(image);
    }
}
