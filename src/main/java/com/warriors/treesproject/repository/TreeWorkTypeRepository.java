package com.warriors.treesproject.repository;

import com.warriors.treesproject.entity.TreeWorkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreeWorkTypeRepository extends JpaRepository<TreeWorkType, Long> {
}
