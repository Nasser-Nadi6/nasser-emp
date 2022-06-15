require("reflect-metadata");

class DIContainer {
    services;
    repositories
    singletonInstances = [];
    transientInstances = [];
    repositoriesInstances=[]


    constructor(services, repositories) {
        console.log("Dependency Injection Container initialized...");
        this.services = services;
        this.repositories = repositories
        this.generateSingletonInstances();
        this.dependencyProvider()
        // this.generateTransientInstances();
    }

    generateSingletonInstances() {
        const deps = this.servicesMustInjectToDI();
        deps.forEach((dep) => {
            this.services.forEach((service) => {
                if (service.name === dep) {
                    this.singletonInstances.push({name: service.name, instance: service.class.getInstance()});
                }
            })
        })
    }

    generateTransientInstances() {
        const deps = this.servicesMustInjectToDI();

        deps.forEach((dep) => {
            this.services.find((service) => {
                if (service.name == dep) {
                    this.transientInstances.push(new service.class());
                }
            });
        });
    }

    servicesMustInjectToDI() {
        const deps = [];
        this.services.forEach((service) => {
            const dep = Reflect.getMetadata("dep", service.class);
            if (dep) {
                deps.push(dep);
            }
        });
        return deps;
    }

    dependencyProvider() {
        console.log("from dependency provider")
        const repos=[]
        this.services.forEach((service) => {
            const serviceDependency = Reflect.getMetadata('dependency', service.class)
            if (serviceDependency) {
                const result=this.repositories.find((repo)=>{
                    return repo.name===serviceDependency
                })
                repos.push(result)
            }
        })
        repos.forEach((repo)=>{
            this.repositoriesInstances.push(repo.class.getInstance())
        })
        console.log(this.repositoriesInstances)
    }
}

module.exports = DIContainer;
