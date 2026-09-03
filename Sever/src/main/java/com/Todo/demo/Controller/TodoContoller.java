package com.Todo.demo.Controller;

import com.Todo.demo.entity.Todo;
import com.Todo.demo.service.Todoservice;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "https://tourmaline-narwhal-362fc9.netlify.app")
public class TodoContoller {

    private final Todoservice todoService;

    public TodoContoller(Todoservice todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return "Todo deleted successfully";
    }
}