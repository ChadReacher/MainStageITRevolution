package com.warriors.treesproject.controller;

import com.warriors.treesproject.entity.Image;
import com.warriors.treesproject.entity.Tree;
import com.warriors.treesproject.entity.TreeWorkType;
import com.warriors.treesproject.service.ImageService;
import com.warriors.treesproject.service.TreeService;
import com.warriors.treesproject.service.TreeWorkTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
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

    @GetMapping
    public List<Tree> getAllTrees(Model model) {
        return treeService.getAllTrees();
    }

}
