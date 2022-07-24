package com.warriors.treesproject.security;

public enum Permission {
    ADMIN_WRITE("admin:write"),
    ADMIN_READ("admin:read"),
    ACTIVIST_WRITE("activist:write"),
    ACTIVIST_READ("activist:read");

    public final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
