include(FetchContent)
cmake_minimum_required(VERSION 3.24)
project(OpenGLLearning)

set(CMAKE_CXX_STANDARD 17)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")

set(SOURCE_FILES
        src/main.cpp
        src/glad.c
        src/stb_image.cpp)

find_package(OpenGL REQUIRED)
find_package(ASSIMP REQUIRED)

FetchContent_Declare(
        glfw
        GIT_REPOSITORY https://github.com/glfw/glfw.git
        GIT_TAG 3.3.8
)
FetchContent_Declare(
        glm
        GIT_REPOSITORY https://github.com/g-truc/glm.git
        GIT_TAG 0.9.9.8
)

FetchContent_MakeAvailable(glfw glm)

configure_file(configuration/root_directory.h.in configuration/root_directory.h)


include_directories(includes ${CMAKE_BINARY_DIR}/configuration)

if(WIN32)
    set(CMAKE_EXE_LINKER_FLAGS ${CMAKE_EXE_LINKER_FLAGS} "-static")
endif()


add_executable(OpenGLLearning ${SOURCE_FILES})

target_link_libraries(OpenGLLearning glfw glm ${ASSIMP_LIBRARIES})


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