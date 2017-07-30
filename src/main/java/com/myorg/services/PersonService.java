package com.myorg.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myorg.dao.PersonRepository;
import com.myorg.entities.Person;

@Service
public class PersonService {
    private PersonRepository personRepo;

    @Autowired
    public PersonService(PersonRepository personRepo) {
        this.personRepo = personRepo;
    }

    public Iterable<Person> getAllPersons() {
        return personRepo.findAll();
    }

    public Person addPerson(Person person) {
        return personRepo.save(person);
    }

    public Person updatePerson(Person person) throws Exception {
        if (personRepo.exists(person.getId())) {
            return personRepo.save(person);
        } else {
            throw new Exception("this person does not exist");
        }
    }

    public void deletePerson(Person person) throws Exception {
        if(personRepo.exists(person.getId()))
            personRepo.delete(person.getId());
        else
            throw new Exception("this person does not exist, already");
    }

}
