package org.worm.bookhunt.chat;

import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import java.util.concurrent.CompletableFuture;

public class CompletableStompSessionHandler extends StompSessionHandlerAdapter {

    private final CompletableFuture<StompSession> sessionFuture;

    public CompletableStompSessionHandler(CompletableFuture<StompSession> sessionFuture) {
        this.sessionFuture = sessionFuture;
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        sessionFuture.complete(session);
    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        sessionFuture.completeExceptionally(exception);
    }
}