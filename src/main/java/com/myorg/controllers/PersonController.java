package com.myorg.controllers;


import com.myorg.entities.Person;
import com.myorg.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/person")
public class PersonController {
    private PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(value = {"/add.action"}, method = RequestMethod.POST)
    public Person addPerson(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    @RequestMapping(value = "/update.action", method = RequestMethod.POST)
    public Person updatePerson(@RequestBody Person person) throws Exception {
        return personService.updatePerson(person);
    }

    @RequestMapping(value = "/delete.action", method = RequestMethod.POST)
    public boolean deletePerson(@RequestBody Person person) throws Exception {
        personService.deletePerson(person);
        return true;
    }
    @RequestMapping(value="/getAll.action", method = RequestMethod.GET)
    public Iterable<Person> getAllPersons() {
        return personService.getAllPersons();
    }


}
