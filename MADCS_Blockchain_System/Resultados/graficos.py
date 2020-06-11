#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Feb  8 14:28:21 2020

@author: alef-pc
"""
import pandas as pd
import matplotlib.pyplot as plt

#### Avaliação e métricas 
def main():
    print("-----------------------INIT----------------------")
    df3 = pd.read_csv('tempoCollet.csv')
    df4 = pd.read_csv('medidasDesempenhoRede2.csv')
    print(df4.info())
    print(df3.info())
    print("-----------------------END ----------------------")
    
    plt.plot(df4[['Tempo']], df4[['Memoria Utilizada (GB)']])
    plt.ylabel('Overhad Memory Used (GB)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Memoria Utilizada (GB)']].mean())
    print("Median: ",df4[['Memoria Utilizada (GB)']].median())
    print("Standard deviation: ",df4[['Memoria Utilizada (GB)']].std())
       
    plt.plot(df4[['Tempo']], df4[['Percentual Global de Processamento Utilizado']])
    plt.ylabel('Overhad CPU (%)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Percentual Global de Processamento Utilizado']].mean())
    print("Median: ",df4[['Percentual Global de Processamento Utilizado']].median())
    print("Standard deviation: ",df4[['Percentual Global de Processamento Utilizado']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia REST API (ms)']], color='blue')
    plt.ylabel('Latency REST API (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia REST API (ms)']].mean())
    print("Median: ",df4[['Latencia REST API (ms)']].median())
    print("Standard deviation: ",df4[['Latencia REST API (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia peer0 (ms)']])
    plt.ylabel('Peer1 latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia peer0 (ms)']].mean())
    print("Median: ",df4[['Latencia peer0 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia peer0 (ms)']].std())
    
    
    x = df4[["Latencia peer0 (ms)"]]
    s = list(x["Latencia peer0 (ms)"])
    a = df3[['Tempo']]
    middleware5 = list(a["Tempo"])
    aux = 0.005
    for i in range(len(middleware5)):
        middleware5[i] = ((middleware5[i] - aux)) + s[i]
        aux = aux + 0.005
    plt.plot(df4[['Tempo']], df4[['Latencia couchdb0 (ms)']])
    plt.plot(df4[['Tempo']], middleware5 , color='red')
    plt.ylabel('Legder Database1 Latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia couchdb0 (ms)']].mean())
    print("Median: ",df4[['Latencia couchdb0 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia couchdb0 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia peer1 (ms)']])
    plt.ylabel('Peer2 latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia peer1 (ms)']].mean())
    print("Median: ",df4[['Latencia peer1 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia peer1 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia couchdb1 (ms)']])
    plt.ylabel('Legder Database2 Latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia couchdb1 (ms)']].mean())
    print("Median: ",df4[['Latencia couchdb1 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia couchdb1 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia peer2 (ms)']])
    plt.ylabel('Peer3 latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia peer2 (ms)']].mean())
    print("Median: ",df4[['Latencia peer2 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia peer2 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia couchdb2 (ms)']])
    plt.ylabel('Legder Database3 Latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia couchdb2 (ms)']].mean())
    print("Median: ",df4[['Latencia couchdb2 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia couchdb2 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia peer3 (ms)']])
    plt.ylabel('Peer4 latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia peer3 (ms)']].mean())
    print("Median: ",df4[['Latencia peer3 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia peer3 (ms)']].std())
    
    plt.plot(df4[['Tempo']], df4[['Latencia couchdb3 (ms)']])
    plt.ylabel('Legder Database4 Latency (ms)')
    plt.xlabel('time (s)')
    plt.show()
    print("Average: ",df4[['Latencia couchdb3 (ms)']].mean())
    print("Median: ",df4[['Latencia couchdb3 (ms)']].median())
    print("Standard deviation: ",df4[['Latencia couchdb3 (ms)']].std())
    
    x = df4[["Latencia peer0 (ms)"]]
    y = df4[["Latencia peer1 (ms)"]]
    z = df4[["Latencia peer2 (ms)"]]
    w = df4[["Latencia peer3 (ms)"]]
    
    s = list(x["Latencia peer0 (ms)"])
    t = list(y["Latencia peer1 (ms)"])
    u = list(z["Latencia peer2 (ms)"]) 
    v = list(w["Latencia peer3 (ms)"])
    
    a = df3[['Tempo']]
    middleware0 = list(a["Tempo"])
    middleware1 = list(a["Tempo"])
    middleware2 = list(a["Tempo"])
    middleware3 = list(a["Tempo"])
    aux = 0.005
    for i in range(len(middleware0)):
        middleware0[i] = ((middleware0[i] - aux)) + s[i]
        middleware1[i] = ((middleware1[i] - aux)) + t[i]
        middleware2[i] = ((middleware2[i] - aux)) + u[i]
        middleware3[i] = ((middleware3[i] - aux)) + v[i]
        aux = aux + 0.005
    
    data = [list(x["Latencia peer0 (ms)"]), middleware0, list(y["Latencia peer1 (ms)"]), middleware1, list(z["Latencia peer2 (ms)"]), middleware2, list(w["Latencia peer3 (ms)"]), middleware3]
    
    fig, ax = plt.subplots()
    ax.set_xlabel('Peers Latency')
    ax.set_ylabel('Standard deviation')
    ax.boxplot(data)
    plt.show()
    
    
    a = df4[["Latencia couchdb0 (ms)"]]
    b = df4[["Latencia couchdb1 (ms)"]]
    c = df4[["Latencia couchdb2 (ms)"]]
    d = df4[["Latencia couchdb3 (ms)"]]
    
    data2 = [list(a["Latencia couchdb0 (ms)"]), list(b["Latencia couchdb1 (ms)"]), list(c["Latencia couchdb2 (ms)"]), list(d["Latencia couchdb3 (ms)"])]
    
    fig, ax = plt.subplots()
    ax.set_xlabel('Database Peers Latency')
    ax.set_ylabel('Standard deviation')
    ax.boxplot(data2)
    plt.show()
    
    print("------------------------- COVARIANCE -------------------------")
    cov = df4.cov()
    print(cov)
    print("------------------------- END        -------------------------")
    
    print("------------------------- CORRELATION -------------------------")
    corr = df4.corr()
    print(corr)
    print("------------------------- END         -------------------------")


if __name__ == "__main__":
    main()