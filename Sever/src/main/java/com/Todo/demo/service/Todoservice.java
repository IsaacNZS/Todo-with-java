package com.Todo.demo.service;

import com.Todo.demo.entity.Todo;
import com.Todo.demo.repository.TodoRepo;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Todoservice {

    private final TodoRepo todoRepo;

    public Todoservice(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // Get todo by id
    public Optional<Todo> getTodoById(Long id) {
        return todoRepo.findById(id);
    }

    // Create todo
    public Todo createTodo(Todo todo) {
        return todoRepo.save(todo);
    }

    // Update todo
    public Todo updateTodo(Long id, Todo newTodo) {

        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(newTodo.getTitle());
        todo.setDescription(newTodo.getDescription());
        todo.setCompleted(newTodo.isCompleted());

        return todoRepo.save(todo);
    }

    // Delete todo
    public void deleteTodo(Long id) {
        todoRepo.deleteById(id);
    }
}