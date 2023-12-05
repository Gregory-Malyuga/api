docker-compose up -d

Если делаете relation с кастомной колонкой используйте такую конструкцию

```
@ManyToOne(() => User, (user: User) => user.chatsCreator, {
  createForeignKeyConstraints: false,
})
@JoinColumn({
  name: 'creator_id',
  foreignKeyConstraintName: 'creator_id',
})
creator: Promise<User>;
```

Так же чтобы подгрузить relation с использованием lazyLoading как в примере выше необходим
вызов find из репозитория
