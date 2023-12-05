docker-compose up -d

Если делаете relation с кастомной колонкой используйте такую конструкцию

```
@ManyToOne(() => User, (user: User) => user.chatsOwner, {
  createForeignKeyConstraints: false,
})
@JoinColumn({
  name: 'owner_id',
  foreignKeyConstraintName: 'owner_id',
})
owner: Promise<User>;
```

Так же чтобы подгрузить relation с использованием lazyLoading как в примере выше необходим
вызов find из репозитория
