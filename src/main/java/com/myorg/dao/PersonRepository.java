package com.myorg.dao;

import org.springframework.data.repository.CrudRepository;

import com.myorg.entities.Person;

public interface PersonRepository extends CrudRepository<Person, Integer> {

}
