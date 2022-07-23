package com.warriors.treesproject.service;

import com.warriors.treesproject.entity.Tree;
import com.warriors.treesproject.repository.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TreeService {

    private TreeRepository treeRepository;

    @Autowired
    public TreeService(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }

    public Tree getTreeById(Long id) {
        Tree Tree = treeRepository.findById(id).get();
        return Tree;
    }

    public List<Tree> getAllTrees() {
        List<Tree> trees = treeRepository.findAll();
        return trees;
    }

    @Transactional
    public void save(Tree tree) {
        treeRepository.save(tree);
    }

    @Transactional
    public void update(Long id, Tree updatedTree) {
        Tree treeToUpdate = getTreeById(id);
        treeToUpdate.setAge(updatedTree.getAge());
        treeToUpdate.setCondition(updatedTree.getCondition());
        treeToUpdate.setCrownRadius(updatedTree.getCrownRadius());
        treeToUpdate.setType(updatedTree.getType());
        treeToUpdate.setImage(updatedTree.getImage());
        treeToUpdate.setWorkType(updatedTree.getWorkType());
        treeRepository.save(treeToUpdate);
    }

    @Transactional
    public void delete(Long id) {
        Tree treeToDelete = getTreeById(id);
        treeRepository.delete(treeToDelete);
    }

    @Transactional
    public void delete(Tree tree) {
        treeRepository.delete(tree);
    }

    public List<Tree> getTreesSortedByWork() {
        return treeRepository.findByWorkTypes();
    }

    public List<Tree> getHealthyTrees() {
        return treeRepository.findByTypeHealthy();
    }

    public List<Tree> getTreesThatNeedRemoval() {
        return treeRepository.findByTypeRemoval();
    }
}
