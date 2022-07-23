package com.warriors.treesproject.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TreeWorkType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String workType;// trimming, treatment, removal

    public TreeWorkType() {}

    public TreeWorkType(String workType) {
        this.workType = workType;
    }

    public TreeWorkType(Long treeWorkTypeId, String workType) {
        this.id = treeWorkTypeId;
        this.workType = workType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkType() {
        return workType;
    }

    public void setWorkType(String workType) {
        this.workType = workType;
    }

    @Override
    public String toString() {
        return "TreeWorkType{" +
                "treeWorkTypeId=" + id +
                ", workType='" + workType + '\'' +
                '}';
    }
}
