package com.warriors.treesproject.controller;

import com.warriors.treesproject.entity.Image;
import com.warriors.treesproject.entity.Tree;
import com.warriors.treesproject.service.ImageService;
import com.warriors.treesproject.service.TreeService;
import com.warriors.treesproject.service.TreeWorkTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "*")
public class MainController {

    TreeWorkTypeService treeWorkTypeService;
    ImageService imageService;
    TreeService treeService;

    @Autowired
    public MainController(TreeWorkTypeService treeWorkTypeService, ImageService imageService, TreeService treeService) {
        this.treeWorkTypeService = treeWorkTypeService;
        this.imageService = imageService;
        this.treeService = treeService;
    }

    @PostMapping("trees")
    public Tree createNewTree(Tree tree, @RequestParam("image") MultipartFile file) throws IOException {
        String encodedImageString = Base64.getMimeEncoder().encodeToString(file.getBytes());
        Image image = new Image(encodedImageString);
        imageService.save(image);
        treeService.save(tree);
        return tree;
    }

    @PostMapping("/trees/{id}/delete")
    public void deleteTree(@PathVariable("id") Long id) {
        treeService.delete(id);
    }

    @GetMapping("trees")
    public List<Tree> getSortedTree(@RequestParam(defaultValue = "all", required = false, name = "sort") String sort) {
        List<Tree> sortedTrees = new ArrayList<>();
        switch(sort) {
            case "all":
                sortedTrees = treeService.getAllTrees();
                break;
            case "work":
                sortedTrees = treeService.getTreesSortedByWork();
                break;
            case "healthy":
                sortedTrees = treeService.getHealthyTrees();
                break;
            case "removal":
                sortedTrees = treeService.getTreesThatNeedRemoval();
                break;
        }
        return sortedTrees;
    }

}
