package com.warriors.treesproject.repository;

import com.warriors.treesproject.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {

    @Query(value = "SELECT * FROM tree JOIN tree_work_types ON tree.registered_number = tree_work_types.registered_number\n" +
            "JOIN tree_work_type ON tree_work_types.tree_work_type_id = tree_work_type.id\n" +
            "WHERE tree_work_type.work_type = 'trimming' OR tree_work_type.work_type = 'treatment'", nativeQuery = true)
    List<Tree> findByWorkTypes();

    @Query(value = "SELECT * FROM tree JOIN tree_work_types ON tree.registered_number = tree_work_types.registered_number\n" +
            "JOIN tree_work_type ON tree_work_types.tree_work_type_id = tree_work_type.id\n" +
            "WHERE tree_work_type.work_type = 'null'", nativeQuery = true)
    List<Tree> findByTypeHealthy();

    @Query(value = "SELECT * FROM tree JOIN tree_work_types ON tree.registered_number = tree_work_types.registered_number\n" +
            "JOIN tree_work_type ON tree_work_types.tree_work_type_id = tree_work_type.id\n" +
            "WHERE tree_work_type.work_type = 'removal'", nativeQuery = true)
    List<Tree> findByTypeRemoval();

}
