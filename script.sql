USE [master]
GO
/****** Object:  Database [LCUPGuidance]    Script Date: 12/6/2018 6:00:12 PM ******/
CREATE DATABASE [LCUPGuidance]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LCUPGuidance', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\LCUPGuidance.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'LCUPGuidance_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\LCUPGuidance_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [LCUPGuidance] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LCUPGuidance].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LCUPGuidance] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LCUPGuidance] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LCUPGuidance] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LCUPGuidance] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LCUPGuidance] SET ARITHABORT OFF 
GO
ALTER DATABASE [LCUPGuidance] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LCUPGuidance] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LCUPGuidance] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LCUPGuidance] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LCUPGuidance] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LCUPGuidance] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LCUPGuidance] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LCUPGuidance] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LCUPGuidance] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LCUPGuidance] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LCUPGuidance] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LCUPGuidance] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LCUPGuidance] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LCUPGuidance] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LCUPGuidance] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LCUPGuidance] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LCUPGuidance] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LCUPGuidance] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [LCUPGuidance] SET  MULTI_USER 
GO
ALTER DATABASE [LCUPGuidance] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LCUPGuidance] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LCUPGuidance] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LCUPGuidance] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [LCUPGuidance] SET DELAYED_DURABILITY = DISABLED 
GO
USE [LCUPGuidance]
GO
/****** Object:  Table [dbo].[Course]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Course](
	[CourseID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Initial] [varchar](255) NULL,
	[StatusID] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
(
	[CourseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Offense]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Offense](
	[OffenseID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Threshold] [int] NULL,
	[StatusID] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_Offense] PRIMARY KEY CLUSTERED 
(
	[OffenseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Parent]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Parent](
	[ParentID] [int] IDENTITY(1,1) NOT NULL,
	[Firstname] [varchar](255) NULL,
	[Middlename] [varchar](255) NULL,
	[Lastname] [varchar](255) NULL,
	[EmailAddress] [varchar](255) NULL,
	[StatusID] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_Parent] PRIMARY KEY CLUSTERED 
(
	[ParentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SchoolYear]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SchoolYear](
	[SchoolYearID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_SchoolYear] PRIMARY KEY CLUSTERED 
(
	[SchoolYearID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Semester]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Semester](
	[SemesterID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_Semester] PRIMARY KEY CLUSTERED 
(
	[SemesterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Status]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Status](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](255) NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Student]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Student](
	[StudentID] [int] IDENTITY(1,1) NOT NULL,
	[Firstname] [varchar](255) NULL,
	[Middlename] [varchar](255) NULL,
	[Lastname] [varchar](255) NULL,
	[EmailAddress] [varchar](255) NULL,
	[CourseID] [int] NULL,
	[StatusID] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[StudentOffenseMapping]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentOffenseMapping](
	[StudentOffenseID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [int] NULL,
	[OffenseID] [int] NULL,
	[SchoolYearID] [int] NULL,
	[SemesterID] [int] NULL,
 CONSTRAINT [PK_StudentOffenseMapping] PRIMARY KEY CLUSTERED 
(
	[StudentOffenseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StudentParentMapping]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentParentMapping](
	[StudentParentID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [int] NULL,
	[ParentID] [int] NULL,
 CONSTRAINT [PK_StudentParentMapping] PRIMARY KEY CLUSTERED 
(
	[StudentParentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 12/6/2018 6:00:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](255) NULL,
	[Password] [varchar](255) NULL,
	[Firstname] [varchar](255) NULL,
	[Middlename] [varchar](255) NULL,
	[Lastname] [varchar](255) NULL,
	[EmailAddress] [varchar](255) NULL,
	[StatusID] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[Updated] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Course] ON 

INSERT [dbo].[Course] ([CourseID], [Name], [Initial], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'Bachelor of Science in Information Technology', N'BSIT', 1, CAST(N'2018-12-05 13:20:28.200' AS DateTime), 1, CAST(N'2018-12-05 13:20:28.200' AS DateTime), 1)
INSERT [dbo].[Course] ([CourseID], [Name], [Initial], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (2, N'Bachelor of Science in Computer Science', N'BSCS', 1, CAST(N'2018-12-05 13:20:41.593' AS DateTime), 1, CAST(N'2018-12-05 13:20:41.593' AS DateTime), 1)
INSERT [dbo].[Course] ([CourseID], [Name], [Initial], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (3, N'Bachelor of Science in Computer Engineering', N'BSCoE', 1, CAST(N'2018-12-05 13:21:02.077' AS DateTime), 1, CAST(N'2018-12-05 13:21:02.077' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Course] OFF
SET IDENTITY_INSERT [dbo].[Offense] ON 

INSERT [dbo].[Offense] ([OffenseID], [Name], [Threshold], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'Failure to wear ID', 2, 1, CAST(N'2018-12-05 13:19:29.400' AS DateTime), 1, CAST(N'2018-12-05 13:19:29.400' AS DateTime), 1)
INSERT [dbo].[Offense] ([OffenseID], [Name], [Threshold], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (2, N'Not proper uniform', 4, 1, CAST(N'2018-12-05 13:19:46.240' AS DateTime), 1, CAST(N'2018-12-05 13:19:46.240' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Offense] OFF
SET IDENTITY_INSERT [dbo].[Parent] ON 

INSERT [dbo].[Parent] ([ParentID], [Firstname], [Middlename], [Lastname], [EmailAddress], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'Janet', N'Aquino', N'Borlongan', N'shaaakuu@gmail.com', 1, CAST(N'2018-12-05 13:15:26.203' AS DateTime), 1, CAST(N'2018-12-05 13:15:26.203' AS DateTime), 1)
INSERT [dbo].[Parent] ([ParentID], [Firstname], [Middlename], [Lastname], [EmailAddress], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (2, N'Fortunato', N'Ronquillo', N'Borlongan III', N'felixborlongangame@gmail.com', 1, CAST(N'2018-12-05 13:16:09.907' AS DateTime), 1, CAST(N'2018-12-05 13:16:09.907' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Parent] OFF
SET IDENTITY_INSERT [dbo].[SchoolYear] ON 

INSERT [dbo].[SchoolYear] ([SchoolYearID], [Name], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'2017', CAST(N'2018-12-05 13:13:36.043' AS DateTime), 1, CAST(N'2018-12-05 13:13:36.043' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[SchoolYear] OFF
SET IDENTITY_INSERT [dbo].[Semester] ON 

INSERT [dbo].[Semester] ([SemesterID], [Name], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'1st', CAST(N'2018-12-05 13:14:26.833' AS DateTime), 1, CAST(N'2018-12-05 13:14:26.833' AS DateTime), 1)
INSERT [dbo].[Semester] ([SemesterID], [Name], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (2, N'2nd', CAST(N'2018-12-05 13:14:31.487' AS DateTime), 1, CAST(N'2018-12-05 13:14:31.487' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Semester] OFF
SET IDENTITY_INSERT [dbo].[Status] ON 

INSERT [dbo].[Status] ([StatusID], [StatusName]) VALUES (1, N'Active')
INSERT [dbo].[Status] ([StatusID], [StatusName]) VALUES (2, N'Inactive')
SET IDENTITY_INSERT [dbo].[Status] OFF
SET IDENTITY_INSERT [dbo].[Student] ON 

INSERT [dbo].[Student] ([StudentID], [Firstname], [Middlename], [Lastname], [EmailAddress], [CourseID], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (2, N'Felix Jacob', N'Aquino', N'Borlongan', N'huzzy414@gmail.com', 1, 1, CAST(N'2018-12-05 13:12:07.483' AS DateTime), 1, CAST(N'2018-12-05 13:12:07.483' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Student] OFF
SET IDENTITY_INSERT [dbo].[StudentOffenseMapping] ON 

INSERT [dbo].[StudentOffenseMapping] ([StudentOffenseID], [StudentID], [OffenseID], [SchoolYearID], [SemesterID]) VALUES (1, 1, 1, 1, 1)
INSERT [dbo].[StudentOffenseMapping] ([StudentOffenseID], [StudentID], [OffenseID], [SchoolYearID], [SemesterID]) VALUES (2, 1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[StudentOffenseMapping] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserID], [Username], [Password], [Firstname], [Middlename], [Lastname], [EmailAddress], [StatusID], [Created], [CreatedBy], [Updated], [UpdatedBy]) VALUES (1, N'felixborlongan', N'asd123', N'Felix Jacob', N'Aquino', N'Borlongan1', N'felixborlongan@gmail.com', 1, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
USE [master]
GO
ALTER DATABASE [LCUPGuidance] SET  READ_WRITE 
GO
