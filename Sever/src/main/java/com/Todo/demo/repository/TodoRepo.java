package com.Todo.demo.repository;

import com.Todo.demo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<Todo, Long> {

}