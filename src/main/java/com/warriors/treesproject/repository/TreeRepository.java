package com.warriors.treesproject.repository;

import com.warriors.treesproject.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {

    @Query(value = "SELECT * FROM tree WHERE work_type = 'treatment' OR work_type = 'trimming'", nativeQuery = true)
    List<Tree> findByWorkTypes();

    @Query(value = "SELECT * FROM tree WHERE work_type ='null'", nativeQuery = true)
    List<Tree> findByTypeHealthy();

    @Query(value = "SELECT * FROM tree WHERE work_type ='removal'", nativeQuery = true)
    List<Tree> findByTypeRemoval();

}
