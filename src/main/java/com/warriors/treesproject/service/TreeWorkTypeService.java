package com.warriors.treesproject.service;


import com.warriors.treesproject.entity.TreeWorkType;
import com.warriors.treesproject.repository.TreeWorkTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TreeWorkTypeService {

    private TreeWorkTypeRepository repository;

    @Autowired
    public TreeWorkTypeService(TreeWorkTypeRepository repository) {
        this.repository = repository;
    }

    public List<TreeWorkType> getAllTreeWorkType() {
        return repository.findAll();
    }

    public TreeWorkType getTreeWorkTypeById(Long id) {
        return repository.findById(id).get();
    }

    @Transactional
    public void save(TreeWorkType treeWorkType) {
        repository.save(treeWorkType);
    }

    @Transactional
    public void update(Long id, TreeWorkType updatedWorkType) {
        TreeWorkType workTypeToUpdate = getTreeWorkTypeById(id);
        workTypeToUpdate.setWorkType(updatedWorkType.getWorkType());
        repository.save(workTypeToUpdate);
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getTreeWorkTypeById(id));
    }

    @Transactional
    public void delete(TreeWorkType treeWorkType) {
        repository.delete(treeWorkType);
    }
}
