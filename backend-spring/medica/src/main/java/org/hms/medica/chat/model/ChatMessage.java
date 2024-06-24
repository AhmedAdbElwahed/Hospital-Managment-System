package org.hms.medica.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    private MessageType type;
    private String content;
    private String sender;
    private String recipient;
    private LocalDateTime timestamp;
    private byte[] imageData; // New field for storing image data

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}
