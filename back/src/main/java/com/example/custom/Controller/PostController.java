package com.example.custom.Controller;

import com.example.custom.AuthenticationFilter.AuthenticationFilter;
import com.example.custom.Dto.PostRequestDto;
import com.example.custom.Dto.PostResponseDto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {
    private static List<PostResponseDto> posts = new ArrayList<>();

    @PostMapping("/post")
    public String createPost(@RequestBody PostRequestDto postRequest) {
        String authHeader = AuthenticationFilter.pinggyAuthHeader.get(); // Retrieve header from ThreadLocal

        if (authHeader == null || authHeader.isEmpty()) {
            return "Unauthorized";
        }

        // Store the post and header value in memory
        PostResponseDto postResponse = new PostResponseDto();
        postResponse.setTitle(postRequest.getTitle());
        postResponse.setBody(postRequest.getBody());
        postResponse.setPinggyAuthHeader(authHeader);
        posts.add(postResponse);

        return "Post created successfully";
    }

    @GetMapping("/list")
    public List<PostResponseDto> getPosts() {
        return posts;
    }
}
