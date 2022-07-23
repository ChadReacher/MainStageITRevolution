package com.warriors.treesproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Tree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registeredNumber;
    private Double crownRadius;
    private Integer age;
    private String type;
    private String condition;
    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;
    @ManyToMany
    @JoinTable(name = "tree_work_types",
            joinColumns = {@JoinColumn(name = "registered_number")},
            inverseJoinColumns = {@JoinColumn(name = "tree_work_type_id")})
    private Set<TreeWorkType> workTypes;

    private Double Latitude;
    private Double Longitude;

    public Tree() {}

    public Tree(Double crownRadius, Integer age, String type, String condition,
                Image image, Set<TreeWorkType> workTypes, Double latitude, Double longitude) {
        this.crownRadius = crownRadius;
        this.age = age;
        this.type = type;
        this.condition = condition;
        this.image = image;
        this.workTypes = workTypes;
        Latitude = latitude;
        Longitude = longitude;
    }

    public Tree(Long registeredNumber, Double crownRadius, Integer age, String type, String condition, Image image, Set<TreeWorkType> workTypes, Double latitude, Double longitude) {
        this.registeredNumber = registeredNumber;
        this.crownRadius = crownRadius;
        this.age = age;
        this.type = type;
        this.condition = condition;
        this.image = image;
        this.workTypes = workTypes;
        Latitude = latitude;
        Longitude = longitude;
    }

    public Long getRegisteredNumber() {
        return registeredNumber;
    }

    public void setRegisteredNumber(Long registeredNumber) {
        this.registeredNumber = registeredNumber;
    }

    public Double getCrownRadius() {
        return crownRadius;
    }

    public void setCrownRadius(Double crownRadius) {
        this.crownRadius = crownRadius;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Set<TreeWorkType> getWorkTypes() {
        return workTypes;
    }

    public void setWorkTypes(Set<TreeWorkType> workTypes) {
        this.workTypes = workTypes;
    }

    public Double getLatitude() {
        return Latitude;
    }

    public void setLatitude(Double latitude) {
        Latitude = latitude;
    }

    public Double getLongitude() {
        return Longitude;
    }

    public void setLongitude(Double longitude) {
        Longitude = longitude;
    }

    @Override
    public String toString() {
        return "Tree{" +
                "registeredNumber=" + registeredNumber +
                ", crownRadius=" + crownRadius +
                ", age=" + age +
                ", type='" + type + '\'' +
                ", condition='" + condition + '\'' +
                ", treeWorkType=" + workTypes +
                '}';
    }
}
