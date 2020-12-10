package ru.mephi.tasks.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dao.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByLogin(login);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(userOptional.get().getLogin())
                .password(userOptional.get().getPassword())
                .roles(userOptional.get().getSystemRole())
                .disabled(!userOptional.get().getActive())
                .build();
    }
}