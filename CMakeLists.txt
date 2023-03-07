include(FetchContent)
cmake_minimum_required(VERSION 3.24)
project(OpenGLLearning)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_OSX_ARCHITECTURES "arm64")

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")

set(SOURCE_FILES
        src/main.cpp
        src/glad.c
        src/stb_image.cpp)

link_directories(${CMAKE_SOURCE_DIR}/lib)

find_package(GLM REQUIRED)
message(STATUS "GLM included at ${GLM_INCLUDE_DIR}")
find_package(GLFW3 REQUIRED)
message(STATUS "Found GLFW3 in ${GLFW3_INCLUDE_DIR}")
find_package(ASSIMP REQUIRED)
message(STATUS "Found ASSIMP in ${ASSIMP_INCLUDE_DIR}")

configure_file(configuration/root_directory.h.in configuration/root_directory.h)


include_directories(includes ${CMAKE_BINARY_DIR}/configuration)

if(WIN32)
    set(CMAKE_EXE_LINKER_FLAGS ${CMAKE_EXE_LINKER_FLAGS} "-static")
endif()


add_executable(OpenGLLearning ${SOURCE_FILES})

target_link_libraries(OpenGLLearning ${GLFW3_LIBRARY} ${ASSIMP_LIBRARIES})

if (APPLE)
    INCLUDE_DIRECTORIES(/System/Library/Frameworks)
    FIND_LIBRARY(COCOA_LIBRARY Cocoa)
    FIND_LIBRARY(OpenGL_LIBRARY OpenGL)
    FIND_LIBRARY(IOKit_LIBRARY IOKit)
    FIND_LIBRARY(CoreVideo_LIBRARY CoreVideo)
    MARK_AS_ADVANCED(COCOA_LIBRARY OpenGL_LIBRARY)
    target_link_libraries(OpenGLLearning ${COCOA_LIBRARY} ${IOKit_LIBRARY} ${OpenGL_LIBRARY} ${CoreVideo_LIBRARY})
endif()

add_custom_target(copy_resources ALL
        COMMAND ${CMAKE_COMMAND} -E copy_directory
        ${PROJECT_SOURCE_DIR}/resources
        ${PROJECT_BINARY_DIR}/resources
        COMMENT "Copying resources into binary directory")

add_custom_target(copy_shaders ALL
        COMMAND ${CMAKE_COMMAND} -E copy_directory
        ${PROJECT_SOURCE_DIR}/shaders
        ${PROJECT_BINARY_DIR}/shaders
        COMMENT "Copying shaders into binary directory")

add_custom_target(copy_dlls ALL 
        COMMAND ${CMAKE_COMMAND} -E copy_directory 
        ${PROJECT_SOURCE_DIR}/dlls
        ${PROJECT_BINARY_DIR}
        COMMENT "Copying dlls into binary directory")


add_dependencies(OpenGLLearning copy_resources copy_shaders copy_dlls)