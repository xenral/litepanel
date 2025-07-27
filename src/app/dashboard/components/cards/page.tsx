'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Share,
  BookOpen,
  Play,
  Download,
  Eye,
  ChevronRight,
  MapPin,
  Mail,
  Settings,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Plus,
  Users,
} from 'lucide-react';

// Import extracted data and utilities
import {
  statsCards,
  productCards,
  teamMembers,
  projectCards,
  blogPosts,
} from '@/data/cards.data';
import {
  renderStars,
  getTrendIcon,
  getTrendColor,
  getStatusColor,
  getPriorityColor,
} from '@/utils/cards.util';

export default function CardsComponentPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/components">
              UI Components
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Cards</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Card Components</h1>
          <p className="text-muted-foreground">
            Versatile card layouts for displaying content, data, and interactive
            elements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Components
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      {/* Card Examples Tabs */}
      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Statistics Cards</h2>
            <p className="text-muted-foreground mb-6">
              Perfect for displaying key metrics, KPIs, and dashboard statistics
              with trends
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = getTrendIcon(stat.trend)!;
              const trendColor = getTrendColor(stat.trend);

              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-muted-foreground flex items-center text-xs">
                        <TrendIcon className={`mr-1 h-4 w-4 ${trendColor}`} />
                        <span className={trendColor}>+{stat.change}%</span>
                        <span className="ml-1">{stat.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Monthly Revenue
                    <Badge variant="outline">+12%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold">$24,780</div>
                  <Progress value={68} className="mb-3" />
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>$16,890 of $25,000 goal</span>
                    <span>68%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>
                    Users active in the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold">2,847</div>
                      <div className="text-muted-foreground text-sm">
                        <span className="text-green-600">↗ 12.5%</span> from
                        last month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Peak: 3,204</div>
                      <div className="text-muted-foreground text-xs">
                        Jan 15, 2024
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-2xl font-bold">4.8%</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Visitors</span>
                      <span>45,210</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Conversions</span>
                      <span className="font-medium">2,170</span>
                    </div>
                    <div className="mt-3 border-t pt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          vs. last month
                        </span>
                        <span className="font-medium text-green-600">
                          +0.3%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Product Cards</h2>
            <p className="text-muted-foreground mb-6">
              Showcase products with images, pricing, ratings, and purchase
              actions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productCards.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge
                        variant={
                          product.badge === 'Sale' ? 'destructive' : 'default'
                        }
                      >
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute right-3 top-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold">{product.name}</h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">
                            {product.price}
                          </span>
                          <span className="text-muted-foreground text-sm line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                        <Badge
                          variant={product.inStock ? 'default' : 'secondary'}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1" disabled={!product.inStock}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Team Member Cards</h2>
            <p className="text-muted-foreground mb-6">
              Display team members with contact information, skills, and
              performance metrics
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="text-muted-foreground flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        {member.location}
                      </div>

                      <div className="text-muted-foreground flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4" />
                        {member.email}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {renderStars(member.rating)}
                          <span className="text-muted-foreground ml-1 text-sm">
                            {member.rating}
                          </span>
                        </div>
                        <Badge variant="outline">
                          {member.projects} projects
                        </Badge>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Project Cards</h2>
            <p className="text-muted-foreground mb-6">
              Track project progress with status indicators, team information,
              and task completion
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectCards.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-muted-foreground text-sm">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Status</span>
                          <div className="mt-1">
                            <Badge variant={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Due Date
                          </span>
                          <div className="mt-1 font-medium">
                            {project.dueDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">
                            {project.team} members
                          </span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {project.tasks.completed}/{project.tasks.total} tasks
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ChevronRight className="mr-2 h-4 w-4" />
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Blog Post Cards</h2>
            <p className="text-muted-foreground mb-6">
              Engaging blog post previews with author information, engagement
              metrics, and actions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 text-sm">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={post.authorAvatar}
                            alt={post.author}
                          />
                          <AvatarFallback>
                            {post.author
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {post.author}
                          </div>
                          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                            <span>{post.publishDate}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-2">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart
                              className={`mr-1 h-4 w-4 ${
                                likedPosts.includes(post.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                            <span className="text-sm">
                              {likedPosts.includes(post.id)
                                ? post.likes + 1
                                : post.likes}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <MessageSquare className="text-muted-foreground mr-1 h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Interactive Cards</h2>
            <p className="text-muted-foreground mb-6">
              Cards with hover effects, animations, and interactive elements
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Hover Effect Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Hover Animation
                  </CardTitle>
                  <CardDescription>
                    This card scales on hover with smooth animation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Move your cursor over this card to see the hover effect in
                    action.
                  </p>
                  <Button className="mt-4 w-full">Try Me</Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alert Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Success Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Your action was completed successfully.
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Dismiss
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Warning Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Please review the following items before proceeding.
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Review
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Proceed
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loading Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="border-primary mr-2 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                  Loading State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted h-4 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
                </div>
                <Button disabled className="mt-4 w-full">
                  Loading...
                </Button>
              </CardContent>
            </Card>

            {/* Notification Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-blue-600">
                    <Info className="mr-2 h-5 w-5" />
                    New Update Available
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Version 2.1.0 includes new features and bug fixes.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Update Now
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Later
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feature Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Premium Feature
                </CardTitle>
                <CardDescription>
                  Unlock advanced analytics and reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Advanced dashboard
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Custom reports
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Priority support
                  </div>
                </div>
                <Button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Interactive cards enhance user engagement through visual feedback,
              animations, and clear calls-to-action. Use them strategically to
              guide user behavior and improve the overall experience.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
