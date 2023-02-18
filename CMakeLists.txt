cmake_minimum_required(VERSION 3.24)
project(OpenGLLearning)

set(CMAKE_CXX_STANDARD 17)

set(SOURCE_FILES
        src/main.cpp
        glad.c includes/opengllearning/filesystem.h stb_image.cpp)

find_package(OpenGL REQUIRED)

add_subdirectory(includes/glfw-3.3.8)

configure_file(configuration/root_directory.h.in configuration/root_directory.h)

include_directories(includes ${CMAKE_BINARY_DIR}/configuration)

if(WIN32)
    set(CMAKE_EXE_LINKER_FLAGS ${CMAKE_EXE_LINKER_FLAGS} "-static")
endif()


add_executable(OpenGLLearning ${SOURCE_FILES})

target_link_libraries(OpenGLLearning ${OPENGL_LIBRARIES} glfw)


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

add_dependencies(OpenGLLearning copy_resources copy_shaders)