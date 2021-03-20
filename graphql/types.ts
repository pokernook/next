import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** One emoji character */
  EmojiSingular: any;
  _FieldSet: any;
};

export enum FriendRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type FriendRequest = {
  __typename?: "FriendRequest";
  createdAt: Scalars["DateTime"];
  from?: Maybe<User>;
  id: Scalars["ID"];
  status: FriendRequestStatus;
  to?: Maybe<User>;
  updatedAt: Scalars["DateTime"];
};

export type Friendship = {
  __typename?: "Friendship";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  users: Array<User>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  discriminator: Scalars["Int"];
  email: Scalars["String"];
  emailVerified?: Maybe<Scalars["DateTime"]>;
  friendships: Array<Friendship>;
  friendRequestsReceived: Array<FriendRequest>;
  friendRequestsSent: Array<FriendRequest>;
  id: Scalars["ID"];
  status?: Maybe<UserStatus>;
  username: Scalars["String"];
};

export type UserAuthPayload = {
  __typename?: "UserAuthPayload";
  user?: Maybe<User>;
};

export type UserLogOutPayload = {
  __typename?: "UserLogOutPayload";
  sessionId?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type UserStatus = {
  __typename?: "UserStatus";
  createdAt: Scalars["DateTime"];
  emoji?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  friendRequestSend?: Maybe<FriendRequest>;
  friendRequestAccept?: Maybe<FriendRequest>;
  friendRequestReject?: Maybe<FriendRequest>;
  friendshipDelete?: Maybe<Friendship>;
  userSignUp?: Maybe<UserAuthPayload>;
  userLogIn?: Maybe<UserAuthPayload>;
  userLogOut?: Maybe<UserLogOutPayload>;
  userUpdateUsername?: Maybe<User>;
  userUpdatePassword?: Maybe<User>;
  userUpdateEmail?: Maybe<User>;
  userDeleteAccount?: Maybe<User>;
  userStatusSet?: Maybe<UserStatus>;
  userStatusClear?: Maybe<UserStatus>;
};

export type MutationfriendRequestSendArgs = {
  username: Scalars["String"];
  discriminator: Scalars["Int"];
};

export type MutationfriendRequestAcceptArgs = {
  friendRequestId: Scalars["String"];
};

export type MutationfriendRequestRejectArgs = {
  friendRequestId: Scalars["String"];
};

export type MutationfriendshipDeleteArgs = {
  friendshipId: Scalars["String"];
};

export type MutationuserSignUpArgs = {
  email: Scalars["EmailAddress"];
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationuserLogInArgs = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type MutationuserUpdateUsernameArgs = {
  newUsername: Scalars["String"];
};

export type MutationuserUpdatePasswordArgs = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type MutationuserUpdateEmailArgs = {
  password: Scalars["String"];
  newEmail: Scalars["EmailAddress"];
};

export type MutationuserStatusSetArgs = {
  emoji?: Maybe<Scalars["EmojiSingular"]>;
  message?: Maybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Json: ResolverTypeWrapper<Scalars["Json"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  FriendRequestStatus: FriendRequestStatus;
  FriendRequest: ResolverTypeWrapper<FriendRequest>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Friendship: ResolverTypeWrapper<Friendship>;
  EmojiSingular: ResolverTypeWrapper<Scalars["EmojiSingular"]>;
  User: ResolverTypeWrapper<User>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  UserAuthPayload: ResolverTypeWrapper<UserAuthPayload>;
  UserLogOutPayload: ResolverTypeWrapper<UserLogOutPayload>;
  UserStatus: ResolverTypeWrapper<UserStatus>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars["DateTime"];
  Json: Scalars["Json"];
  EmailAddress: Scalars["EmailAddress"];
  FriendRequest: FriendRequest;
  ID: Scalars["ID"];
  Friendship: Friendship;
  EmojiSingular: Scalars["EmojiSingular"];
  User: User;
  Int: Scalars["Int"];
  String: Scalars["String"];
  UserAuthPayload: UserAuthPayload;
  UserLogOutPayload: UserLogOutPayload;
  UserStatus: UserStatus;
  Query: {};
  Mutation: {};
  Boolean: Scalars["Boolean"];
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Json"], any> {
  name: "Json";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type FriendRequestResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FriendRequest"] = ResolversParentTypes["FriendRequest"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes["FriendRequestStatus"],
    ParentType,
    ContextType
  >;
  to?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendshipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Friendship"] = ResolversParentTypes["Friendship"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmojiSingularScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmojiSingular"], any> {
  name: "EmojiSingular";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  discriminator?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  emailVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  friendships?: Resolver<
    Array<ResolversTypes["Friendship"]>,
    ParentType,
    ContextType
  >;
  friendRequestsReceived?: Resolver<
    Array<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType
  >;
  friendRequestsSent?: Resolver<
    Array<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["UserStatus"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserAuthPayload"] = ResolversParentTypes["UserAuthPayload"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLogOutPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserLogOutPayload"] = ResolversParentTypes["UserLogOutPayload"]
> = {
  sessionId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserStatus"] = ResolversParentTypes["UserStatus"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  emoji?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  friendRequestSend?: Resolver<
    Maybe<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType,
    RequireFields<MutationfriendRequestSendArgs, "username" | "discriminator">
  >;
  friendRequestAccept?: Resolver<
    Maybe<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType,
    RequireFields<MutationfriendRequestAcceptArgs, "friendRequestId">
  >;
  friendRequestReject?: Resolver<
    Maybe<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType,
    RequireFields<MutationfriendRequestRejectArgs, "friendRequestId">
  >;
  friendshipDelete?: Resolver<
    Maybe<ResolversTypes["Friendship"]>,
    ParentType,
    ContextType,
    RequireFields<MutationfriendshipDeleteArgs, "friendshipId">
  >;
  userSignUp?: Resolver<
    Maybe<ResolversTypes["UserAuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationuserSignUpArgs, "email" | "username" | "password">
  >;
  userLogIn?: Resolver<
    Maybe<ResolversTypes["UserAuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationuserLogInArgs, "email" | "password">
  >;
  userLogOut?: Resolver<
    Maybe<ResolversTypes["UserLogOutPayload"]>,
    ParentType,
    ContextType
  >;
  userUpdateUsername?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationuserUpdateUsernameArgs, "newUsername">
  >;
  userUpdatePassword?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationuserUpdatePasswordArgs,
      "currentPassword" | "newPassword"
    >
  >;
  userUpdateEmail?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationuserUpdateEmailArgs, "password" | "newEmail">
  >;
  userDeleteAccount?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  userStatusSet?: Resolver<
    Maybe<ResolversTypes["UserStatus"]>,
    ParentType,
    ContextType,
    RequireFields<MutationuserStatusSetArgs, never>
  >;
  userStatusClear?: Resolver<
    Maybe<ResolversTypes["UserStatus"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Json?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  Friendship?: FriendshipResolvers<ContextType>;
  EmojiSingular?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAuthPayload?: UserAuthPayloadResolvers<ContextType>;
  UserLogOutPayload?: UserLogOutPayloadResolvers<ContextType>;
  UserStatus?: UserStatusResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  FriendRequest?: {
    createdAt?: LoaderResolver<
      Scalars["DateTime"],
      FriendRequest,
      {},
      TContext
    >;
    from?: LoaderResolver<Maybe<User>, FriendRequest, {}, TContext>;
    id?: LoaderResolver<Scalars["ID"], FriendRequest, {}, TContext>;
    status?: LoaderResolver<FriendRequestStatus, FriendRequest, {}, TContext>;
    to?: LoaderResolver<Maybe<User>, FriendRequest, {}, TContext>;
    updatedAt?: LoaderResolver<
      Scalars["DateTime"],
      FriendRequest,
      {},
      TContext
    >;
  };

  Friendship?: {
    createdAt?: LoaderResolver<Scalars["DateTime"], Friendship, {}, TContext>;
    id?: LoaderResolver<Scalars["ID"], Friendship, {}, TContext>;
    users?: LoaderResolver<Array<User>, Friendship, {}, TContext>;
  };

  User?: {
    createdAt?: LoaderResolver<Scalars["DateTime"], User, {}, TContext>;
    discriminator?: LoaderResolver<Scalars["Int"], User, {}, TContext>;
    email?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    emailVerified?: LoaderResolver<
      Maybe<Scalars["DateTime"]>,
      User,
      {},
      TContext
    >;
    friendships?: LoaderResolver<Array<Friendship>, User, {}, TContext>;
    friendRequestsReceived?: LoaderResolver<
      Array<FriendRequest>,
      User,
      {},
      TContext
    >;
    friendRequestsSent?: LoaderResolver<
      Array<FriendRequest>,
      User,
      {},
      TContext
    >;
    id?: LoaderResolver<Scalars["ID"], User, {}, TContext>;
    status?: LoaderResolver<Maybe<UserStatus>, User, {}, TContext>;
    username?: LoaderResolver<Scalars["String"], User, {}, TContext>;
  };

  UserAuthPayload?: {
    user?: LoaderResolver<Maybe<User>, UserAuthPayload, {}, TContext>;
  };

  UserLogOutPayload?: {
    sessionId?: LoaderResolver<
      Maybe<Scalars["String"]>,
      UserLogOutPayload,
      {},
      TContext
    >;
    user?: LoaderResolver<Maybe<User>, UserLogOutPayload, {}, TContext>;
  };

  UserStatus?: {
    createdAt?: LoaderResolver<Scalars["DateTime"], UserStatus, {}, TContext>;
    emoji?: LoaderResolver<Maybe<Scalars["String"]>, UserStatus, {}, TContext>;
    id?: LoaderResolver<Scalars["ID"], UserStatus, {}, TContext>;
    message?: LoaderResolver<
      Maybe<Scalars["String"]>,
      UserStatus,
      {},
      TContext
    >;
    updatedAt?: LoaderResolver<Scalars["DateTime"], UserStatus, {}, TContext>;
    user?: LoaderResolver<Maybe<User>, UserStatus, {}, TContext>;
  };
}
export type userFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "createdAt" | "email" | "emailVerified" | "username" | "discriminator"
> & {
    status?: Maybe<
      { __typename?: "UserStatus" } & Pick<
        UserStatus,
        "id" | "emoji" | "message"
      >
    >;
  };

export type friendshipsQueryVariables = Exact<{ [key: string]: never }>;

export type friendshipsQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        friendships: Array<
          { __typename?: "Friendship" } & Pick<Friendship, "createdAt"> & {
              users: Array<{ __typename?: "User" } & userFieldsFragment>;
            }
        >;
      }
  >;
};

export type meQueryVariables = Exact<{ [key: string]: never }>;

export type meQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
};

export type deleteAccountMutationVariables = Exact<{ [key: string]: never }>;

export type deleteAccountMutation = { __typename?: "Mutation" } & {
  userDeleteAccount?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
};

export type friendRequestSendMutationVariables = Exact<{
  username: Scalars["String"];
  discriminator: Scalars["Int"];
}>;

export type friendRequestSendMutation = { __typename?: "Mutation" } & {
  friendRequestSend?: Maybe<
    { __typename?: "FriendRequest" } & Pick<
      FriendRequest,
      "createdAt" | "id" | "status" | "updatedAt"
    > & {
        from?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
        to?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
      }
  >;
};

export type logInMutationVariables = Exact<{
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
}>;

export type logInMutation = { __typename?: "Mutation" } & {
  userLogIn?: Maybe<
    { __typename?: "UserAuthPayload" } & {
      user?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
    }
  >;
};

export type logOutMutationVariables = Exact<{ [key: string]: never }>;

export type logOutMutation = { __typename?: "Mutation" } & {
  userLogOut?: Maybe<
    { __typename?: "UserLogOutPayload" } & Pick<UserLogOutPayload, "sessionId">
  >;
};

export type signUpMutationVariables = Exact<{
  username: Scalars["String"];
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
}>;

export type signUpMutation = { __typename?: "Mutation" } & {
  userSignUp?: Maybe<
    { __typename?: "UserAuthPayload" } & {
      user?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
    }
  >;
};

export type statusClearMutationVariables = Exact<{ [key: string]: never }>;

export type statusClearMutation = { __typename?: "Mutation" } & {
  userStatusClear?: Maybe<
    { __typename?: "UserStatus" } & Pick<UserStatus, "id">
  >;
};

export type statusSetMutationVariables = Exact<{
  emoji?: Maybe<Scalars["EmojiSingular"]>;
  message?: Maybe<Scalars["String"]>;
}>;

export type statusSetMutation = { __typename?: "Mutation" } & {
  userStatusSet?: Maybe<
    { __typename?: "UserStatus" } & Pick<
      UserStatus,
      "createdAt" | "emoji" | "id" | "message" | "updatedAt"
    > & { user?: Maybe<{ __typename?: "User" } & userFieldsFragment> }
  >;
};

export type updateEmailMutationVariables = Exact<{
  newEmail: Scalars["EmailAddress"];
  password: Scalars["String"];
}>;

export type updateEmailMutation = { __typename?: "Mutation" } & {
  userUpdateEmail?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
};

export type updatePasswordMutationVariables = Exact<{
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type updatePasswordMutation = { __typename?: "Mutation" } & {
  userUpdatePassword?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
};

export type updateUsernameMutationVariables = Exact<{
  newUsername: Scalars["String"];
}>;

export type updateUsernameMutation = { __typename?: "Mutation" } & {
  userUpdateUsername?: Maybe<{ __typename?: "User" } & userFieldsFragment>;
};

export const userFieldsFragmentDoc: DocumentNode<
  userFieldsFragment,
  unknown
> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "userFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "emailVerified" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "discriminator" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "status" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "emoji" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const friendshipsDocument: DocumentNode<
  friendshipsQuery,
  friendshipsQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "friendships" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "friendships" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "users" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "userFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const meDocument: DocumentNode<meQuery, meQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "userFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const deleteAccountDocument: DocumentNode<
  deleteAccountMutation,
  deleteAccountMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteAccount" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDeleteAccount" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "userFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const friendRequestSendDocument: DocumentNode<
  friendRequestSendMutation,
  friendRequestSendMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "friendRequestSend" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "discriminator" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "friendRequestSend" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "discriminator" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "discriminator" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "from" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "userFields" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "to" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "userFields" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const logInDocument: DocumentNode<
  logInMutation,
  logInMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "logIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EmailAddress" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userLogIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "userFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const logOutDocument: DocumentNode<
  logOutMutation,
  logOutMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "logOut" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userLogOut" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "sessionId" } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const signUpDocument: DocumentNode<
  signUpMutation,
  signUpMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "signUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EmailAddress" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userSignUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "userFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const statusClearDocument: DocumentNode<
  statusClearMutation,
  statusClearMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "statusClear" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userStatusClear" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const statusSetDocument: DocumentNode<
  statusSetMutation,
  statusSetMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "statusSet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "emoji" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "EmojiSingular" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "message" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userStatusSet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "emoji" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "emoji" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "message" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "message" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "emoji" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "userFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const updateEmailDocument: DocumentNode<
  updateEmailMutation,
  updateEmailMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newEmail" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EmailAddress" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdateEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newEmail" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newEmail" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "userFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const updatePasswordDocument: DocumentNode<
  updatePasswordMutation,
  updatePasswordMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updatePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "currentPassword" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newPassword" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdatePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "currentPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "currentPassword" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newPassword" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "userFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
export const updateUsernameDocument: DocumentNode<
  updateUsernameMutation,
  updateUsernameMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUsername" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newUsername" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdateUsername" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newUsername" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newUsername" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "userFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...userFieldsFragmentDoc.definitions,
  ],
};
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
